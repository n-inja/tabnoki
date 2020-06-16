export default function promisify<Arg, Result>(
  fn: (arg: Arg, callback: (result: Result) => void) => void
): (arg: Arg) => Promise<Result> {
  return (arg: Arg) => {
    return new Promise<Result>((resolve) => {
      fn(arg, resolve);
    });
  };
}
