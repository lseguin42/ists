declare var is: IsTS.IsChecker

declare module IsTS {
    interface Operator {
        (value: IRules): Rules<Operator>;
    }

    type OperatorTemplate<T> = Operator & T;

    interface IRules {
        (value: any): boolean;
    }

    interface _Rules<T> extends IRules{
    
        or: OperatorTemplate<T>;
        
        and: OperatorTemplate<T>;
        
    }

    type Rules<T> = _Rules<T> & T

    interface IsNumberTemplate<T> extends
        Not<IsNumberTemplate<T>>,
        InExtends<number, T>
    {   
        equal(value: number): Rules<T>;
        inf(value: number): Rules<T>;
        sup(value: number): Rules<T>;
        supeq(value: number): Rules<T>;
        infeq(value: number): Rules<T>;
    }

    interface IsNumber extends IsNumberTemplate<IsNumber> {}

    interface Not<T> {
        not: T
    }

    interface Length<T> {
        length: IsNumberTemplate<T>
    }

    interface InContainer<ElementType, T> {
        array(elements: ElementType[]): Rules<T>
        list(...args: ElementType[]): Rules<T>
    }

    interface InContainerExtends<ElementType, T> extends InContainer<ElementType, T> {
        range(min: ElementType, max: ElementType)
    }

    interface In<ElementType, T> {
        in: InContainer<ElementType, T>
    }

    interface InExtends<ElementType, T> {
        in: InContainerExtends<ElementType, T>
    }

    interface IsString extends
        Not<IsString>,
        In<string, IsString>,
        Length<IsString>
    {
        equal(value: string): Rules<IsString>;
        match(regex: RegExp): Rules<IsString>;
    }

    interface With<T> {
        with: {
            properties(object: any): Rules<T>
            property(name: string, rule: IRules): Rules<T>
        }
    }

    interface IsObject extends 
        Not<IsObject>,
        With<IsObject>
    {
        instanceOf(type: any): Rules<IsObject>
    }

    interface IsArray extends
        Not<IsArray>,
        Length<IsArray>
    {
        each(rule: IRules, options?: { start: number, end: number }): Rules<IsArray>
    }

    interface IsBoolean extends
        Not<IsBoolean>
    {
        equal(bool: boolean): Rules<IsBoolean>
    }

    interface IsUndefined 
    {
    }

    interface IsFunction
    {
    }

    interface IsAny
    {
    }

    interface IsNumberRules    extends IsNumber,    IRules {}
    interface IsStringRules    extends IsString,    IRules {}
    interface IsObjectRules    extends IsObject,    IRules {}
    interface IsArrayRules     extends IsArray,     IRules {}
    interface IsBooleanRules   extends IsBoolean,   IRules {}
    interface IsUndefinedRules extends IsUndefined, IRules {}
    interface IsFunctionRules  extends IsFunction,  IRules {}
    interface IsAnyRules       extends IsAny,       IRules {}

    interface IsChecker {
        
        number: IsNumberRules;
        
        string: IsStringRules;

        object: IsObjectRules;
        
        array: IsArrayRules;
        
        any: IsArrayRules;
        
        boolean: IsBooleanRules;
        
        undefined: IsUndefinedRules;
        
        function: IsFunctionRules;

    }
}

export = is