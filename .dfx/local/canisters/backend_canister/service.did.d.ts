import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Product {
  'id' : bigint,
  'Image' : string,
  'Price' : bigint,
  'Title' : string,
  'Rating' : bigint,
}
export interface _SERVICE {
  'addProduct' : ActorMethod<[bigint, string, bigint, bigint, string], string>,
  'getAllProducts' : ActorMethod<[], Array<[bigint, Product]>>,
  'getProduct' : ActorMethod<[bigint], [] | [Product]>,
  'greet' : ActorMethod<[bigint, string, bigint, bigint, string], string>,
  'removeProduct' : ActorMethod<[bigint], [] | [Product]>,
  'whoami' : ActorMethod<[], Principal>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
