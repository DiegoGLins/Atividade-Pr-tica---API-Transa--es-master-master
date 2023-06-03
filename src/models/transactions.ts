import { v4 as createUuid } from 'uuid';

export enum TransactionType {
    Income = "I",
    Outcome = "O"
}

export class Transaction {

    private _id:string
    
constructor(
    
    private _title:string,
    private _value:number,
    private _type:TransactionType
    ){
        this._id = createUuid();
    }

     //// --------- get ------ //////

    public get id(): string{
        return this._id;
    }

    public get title(): string{
        return this._title;
    }
    
    public get value(): number{
        return this._value;
    }

    public get type(): TransactionType{
        return this._type;
    }

    //// --------- set ------ //////

    public set title(title: string){
        this._title = title
    }
    
    public set value(value: number){
        this._value = value
    }

    public set type(type: TransactionType){
        this._type = type
    }

}