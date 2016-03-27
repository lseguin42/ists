declare var is: IsChecker;

interface Operator {
    (value: IRules): Rules<Operator>;
}

type OperatorTemplate<T> = Operator & T;

interface IRules {
    (value: any): boolean;
}

interface Rules<T> extends IRules {
   
    or: OperatorTemplate<T>;
    
    and: OperatorTemplate<T>;
    
}

interface ContainerTemplate<IN, OUT> {
    
    array(numbers: Array<IN>): OUT;
    
    list(...numbers: IN[]): OUT;
    
}

interface ContainerNumber<T> extends ContainerTemplate<number, T> {
    
    range(min: number, max: number): T;
    
    xrange(min: number, max: number): T;
    
}

interface IsNumberTemplate<T> {
    
    in: ContainerNumber<T>;
    
    out: ContainerNumber<T>;
    
    equal(value: number): T;
    
    inf(value: number): T;
    
    sup(value: number): T;
    
}

interface IsNumber extends IRules, IsNumberTemplate<Rules<IsNumber>> {
    
}

interface IsString extends IRules {
    
    in: ContainerTemplate<string, Rules<IsString>>;
    
    out: ContainerTemplate<string, Rules<IsString>>;

    length: IsNumberTemplate<Rules<IsString>>;

    equal(value: string): Rules<IsString>;
    
    match(regex: RegExp): Rules<IsString>;
    
}

interface IsChecker {
    
    string: IsString;
    
    number: IsNumber;
    
    object: any;
    
    array: any;
    
}