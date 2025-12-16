// Declaring type of props - see "Typing Component Props" for more examples
type AppProps = {
  message: string;
}; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.
const App = ({ message }: AppProps) => <div>{message}</div>;

// You can choose to annotate the return type so an error is raised if you accidentally return some other type
const App = ({ message }: AppProps): React.JSX.Element => <div>{message}</div>;

// You can also inline the type declaration; eliminates naming the prop types, but looks repetitive
const App = ({ message }: { message: string }) => <div>{message}</div>;

// Alternatively, you can use `React.FunctionComponent` (or `React.FC`), if you prefer.
// With latest React types and TypeScript 5.1. it's mostly a stylistic choice, otherwise discouraged.
const App: React.FunctionComponent<{ message: string }> = ({ message }) => (
  <div>{message}</div>
);
// or
const App: React.FC<AppProps> = ({ message }) => <div>{message}</div>;