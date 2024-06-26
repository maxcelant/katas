
// 1. Define a generic interface ServiceResponseult that represents the result of an operation. 
// It should have success (boolean) and data (of type T) properties.

interface ServiceRes<T> {
  success: boolean,
  data: T
}

const someData: ServiceRes<string[]> = {
  success: true,
  data: ['some', 'data']
}

console.log(someData);

// 2. Create a utility type ReadOnly that makes all properties of a type T read-only.

type ReadOnly<T> = {
  readonly [P in keyof T]: T[P];
}

const cantEdit: ReadOnly<{ bar: string, baz: number }> = {
  bar: 'bar',
  baz: 21
}

console.log(cantEdit)

// 3. Implement a generic class Pair that holds two values (first and second) of any types.

class Pair<T, U> {
  constructor(public first: T, public second: U) {}
}

const pair = new Pair<string, number>('first', 2);

console.log(pair);

// 4. Write a generic function mapArray that maps an array of type T 
// to an array of type U using a provided mapping function.

function mapArray<T, U>(arr: T[], mapper: (value: T) => U): U[] {
  return arr.map(v => mapper(v));
}

const newArr = mapArray<number, string>([1,2,3], (val) => {
  return val.toString();
})

console.log(newArr);

// 5. Create a generic function pluck that extracts a property of a given name 
// from each object in an array. Ensure the property exists on the objects.

function pluck<T, K extends keyof T>(arr: T[], key: K): T[K][] {
  return arr.map((o: T) => o[key]);
}

const records = [
  { name: 'Max', age: 21 },
  { name: 'David', age: 17 },
  { name: 'John', age: 45 },
]

const pluckedData = pluck<{ name: string, age: number }, 'name'>(records, 'name');

console.log(pluckedData);

// 6. Define a generic type Wrapper that wraps a type T with a value property.

type Wrapper<T> = {
  value: T;
}

type SomeData = {
  name: string
}

const present: Wrapper<SomeData> = {
  value: {
    name: 'foo'
  }
}

// 7. Create a generic interface Service with a method execute 
// that takes a parameter of type T and returns a Promise<U>.

type ObjectLike = { [key: string]: string };
type ServiceResponse = {
  status: number;
  message: string;
  error?: string;
}

interface Service<T, U> {
  execute(request: T): Promise<U>;
}

class MyService implements Service<ObjectLike, ServiceResponse> {
  execute(request: ObjectLike): Promise<ServiceResponse> {
    try {
      return Promise.resolve({ status: 200, message: request.text });
    } catch (e: any) {
      return Promise.resolve({ status: 200, message: request.text, error: e.message });
    }
  }
}

const s = new MyService();

const res = s.execute({ text: 'Sending request...'})

console.log(res);

// 8. Define a generic recursive type TreeNode that represents 
// a tree node with a value of type T and an array of child nodes.

type TreeNode<T> = {
  value: T,
  children: TreeNode<T>[]
}

const tree: TreeNode<string> = {
  value: 'A',
  children: [
    { value: 'B', children: [] },
    { value: 'C', children: [] },
    { value: 'D', children: [
      { value: 'E', children: [] },
      { value: 'F', children: [
        { value: 'G', children: [] }
      ] },
    ] },
  ]
}

function traverse<T>(root: TreeNode<T>): void {
  console.log(root.value);
  for (const node of root.children) {
    traverse<T>(node);
  }
}

traverse(tree);

// 10. Write a generic function groupBy that groups elements of an array by a specified key.

function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, cur) => {
    const groupKey = String(cur[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(cur);
    return acc;
  }, {} as Record<string, T[]>)
}

// 11. Create a utility type DeepReadonly<T> that makes all properties of a type T recursively read-only.
// This means that not only should the properties of T be read-only, but all nested properties should also be read-only.

type FunctionLike = (...args: any[]) => any;

// If its a function, dont do anything.
// If its an array, make it a ReadonlyArray.
// If its an object, make each field readonly.
// If its a primitive, dont change it.
type DeepReadOnly<T> = T extends FunctionLike 
  ? T
  : T extends Array<infer U>
  ? ReadonlyArray<DeepReadOnly<U>>
  : T extends object
  ? {
      readonly [K in keyof T]: DeepReadOnly<T[K]>;
    }
  : T;

type User = { id: number, name: string, metadata: { dob: string, last_logged: string }};

type ReadOnlyUser = DeepReadOnly<User>;

const user: ReadOnlyUser = {
  id: 1,
  name: 'Max',
  metadata: {
    dob: '11-09-1998',
    last_logged: '05-22-2024'
  }
}

// user.name = 'foo'; // Doesn't work!
console.log(user);

// 12. Create a utility type DeepPartial<T> that makes all properties of a type T recursively optional.

type DeepPartial<T> = {
  [K in keyof T]?: DeepPartial<T[K]>
}

type PartialUser = DeepPartial<User>;

const user2: PartialUser = {
  id: 1,
  name: 'David'
  // metadata is not here because its optional!
}






