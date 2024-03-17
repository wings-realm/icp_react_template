import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";

actor {
  stable var stableMap : [(Int, Product)] = [];
  stable var stableCart : [(Principal, [Product])] = [];

  public type Product = {
    id : Int;
    Title : Text;
    Price : Int;
    Rating : Int;
    Image : Text;
  };

  var map = HashMap.fromIter<Int, Product>(Iter.fromArray(stableMap), 1000000, Int.equal, Int.hash);
  var cart = HashMap.fromIter<Principal, [Product]>(Iter.fromArray(stableCart), 100000, Principal.equal, Principal.hash);

  public shared (msg) func whoami() : async Principal {
    msg.caller
  };

  system func preupgrade() {
    stableMap := Iter.toArray(map.entries());
    stableCart := Iter.toArray(cart.entries());
  };

  system func postupgrade() {
    map := HashMap.fromIter<Int, Product>(Iter.fromArray(stableMap), 1000000, Int.equal, Int.hash);
    cart := HashMap.fromIter<Principal, [Product]>(Iter.fromArray(stableCart), 100000, Principal.equal, Principal.hash);
  };

  public shared func addProduct(id: Int, title: Text, price: Int, rating: Int, image: Text) : async Text {
    let product = { id = id; Title = title; Price = price; Rating = rating; Image = image };
    map.put(id, product);
    return "Done";
  };

  public query func getProduct(id: Int) : async ?Product {
    return map.get(id);
  };

  public shared func removeProduct(id: Int) : async ?Product {
    return map.remove(id);
  };

  public query func getAllProducts() : async [(Int, Product)] {
    return Iter.toArray(map.entries());
  };

  public shared func addToCart(user: Principal, id: Int) : async Text {
    switch (map.get(id)) {
      case (null) { return "Product not found"; };
      case (?product) {
        switch (cart.get(user)) {
          case (null) {
            cart.put(user, [product]);
            return "Product added to cart";
          };
          case (?products) {
            let newProducts = Array.append<Product>(products, [product]);
            cart.put(user, newProducts);
            return "Product added to cart";
          };
        };
      };
    };
  };
  public query func showCart(user: Principal) : async ?[Product] {
  return cart.get(user);
};

  public shared func removeFromCart(user: Principal, id: Int) : async Text {
    switch (cart.get(user)) {
      case (null) { return "No products in cart"; };
      case (?products) {
        let newProducts = Array.filter<Product>(products, func (p: Product) : Bool { p.id != id });
        cart.put(user, newProducts);
        return "Product removed from cart";
      };
    };
  };
};