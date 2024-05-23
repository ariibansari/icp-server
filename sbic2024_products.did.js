const idlFactory = ({ IDL }) => {
  const ProductId = IDL.Nat32;
  const Product = IDL.Record({ 'sku': IDL.Text, 'name': IDL.Text });
  return IDL.Service({
    'delete': IDL.Func([ProductId], [IDL.Bool], []),
    'insert': IDL.Func([Product], [ProductId], []),
    'listAll': IDL.Func([], [IDL.Vec(Product)], ['query']),
    'update': IDL.Func([ProductId, Product], [IDL.Bool], []),
  });
};
const init = ({ IDL }) => { return []; };

module.exports = { idlFactory, init }