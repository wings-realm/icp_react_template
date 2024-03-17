export const idlFactory = ({ IDL }) => {
  const Product = IDL.Record({
    'id' : IDL.Int,
    'Image' : IDL.Text,
    'Price' : IDL.Int,
    'Title' : IDL.Text,
    'Rating' : IDL.Int,
  });
  return IDL.Service({
    'addProduct' : IDL.Func(
        [IDL.Int, IDL.Text, IDL.Int, IDL.Int, IDL.Text],
        [IDL.Text],
        [],
      ),
    'addToCart' : IDL.Func([IDL.Principal, IDL.Int], [IDL.Text], []),
    'getAllProducts' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Int, Product))],
        ['query'],
      ),
    'getProduct' : IDL.Func([IDL.Int], [IDL.Opt(Product)], ['query']),
    'removeFromCart' : IDL.Func([IDL.Principal, IDL.Int], [IDL.Text], []),
    'removeProduct' : IDL.Func([IDL.Int], [IDL.Opt(Product)], []),
    'showCart' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(IDL.Vec(Product))],
        ['query'],
      ),
    'whoami' : IDL.Func([], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
