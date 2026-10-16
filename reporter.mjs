export default async function* reporter(source) {
  let number = 0;
  let passed = 0;
  let failed = 0;
  let summary;

  for await (const { type, data } of source) {
    if (type === 'test:pass' || type === 'test:fail') {
      number++;

      if (type === 'test:pass') passed++;
      else failed++;

      const symbol = type === 'test:pass'
        ? '\u001b[32m[PASS]\u001b[0m'
        : '\u001b[31m[FAIL]\u001b[0m';
      const duration = data.details?.duration_ms;

      yield `${symbol} ${number}. ${data.name}${
        duration == null ? '' : ` (${duration.toFixed(2)}ms)`
      }\n`;
    }

    if (type === 'test:summary' && data.file === undefined) {
      summary = data;
    }
  }

  yield `\nℹ tests ${summary?.counts?.tests ?? number}\n`;
  yield `ℹ pass ${summary?.counts?.passed ?? passed}\n`;
  yield `ℹ fail ${summary?.counts?.failed ?? failed}\n`;

  if (summary) {
    yield `ℹ duration_ms ${summary.duration_ms.toFixed(2)}\n`;
  }
}
