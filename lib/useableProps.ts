type Appprops = { 
    message: string;
    count: number;
    disabled: boolean;

    /* Array of a Type: */
    names: string[];

    /* string literals for Union type values to join them together */

    status: "waiting" | "completed";

    /* An Object with known properties */
    obj: {
        id: string;
        title: string;
    };
    
    /* Array of objects */
    obj1: {
        id: string;
        title: string;
    }[];

    /* Any non primitive typ[e of data that cannot accessed, very less used but can be helpful for placeholders */

    obj2: object;

    /* Interface with no required properties */

    obj3: {};

    /* A dictionary object */
      dict1: {
    [key: string]: MyTypeHere;
  };
  dict2: Record<string, MyTypeHere>; 
  
  onClick: () => void
  onChange: (id: number) => void// equivalent to dict1

  onChange1: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClick1(event: React.MouseEvent<HTMLButtonElement>): void;
  /** any function as long as you don't invoke it (not recommended) */
  onSomething: Function;
  /** an optional prop (VERY COMMON!) */
  optional?: OptionalType;
  /** when passing down the state setter function returned by `useState` to a child component. `number` is an example, swap out with whatever the type of your state */
  setState: React.Dispatch<React.SetStateAction<number>>;
}