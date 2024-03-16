import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";

actor {
  stable var stableMap : [(Int, Product)] = [];

  public type Product = {
    id : Int;
    Title : Text;
    Price : Int;
    Rating : Int;
    Image : Text;
  };

  var map = HashMap.fromIter<Int, Product>(Iter.fromArray(stableMap), 1000000, Int.equal, Int.hash);

  var cart : HashMap.HashMap<Principal, [Product]> = HashMap.HashMap<Principal, [Product]>(100000, Principal.equal, Principal.hash);

  public shared (msg) func whoami() : async Principal {
        msg.caller
    };

  system func preupgrade() {
    stableMap := Iter.toArray(map.entries());
  };

  system func postupgrade() {
    map := HashMap.fromIter<Int, Product>(Iter.fromArray(stableMap), 1000000, Int.equal, Int.hash);
  };

  // Example usage: Add an entry to the HashMap
  public shared func addProduct(id: Int, title: Text, price: Int, rating: Int, image: Text) : async Text {
    let product = { id = id; Title = title; Price = price; Rating = rating; Image = image };
    map.put(id, product);
    return "Done";
  };

  // Example usage: Retrieve a product from the HashMap
  public query func getProduct(id: Int) : async ?Product {
    return map.get(id);
  };

  // Remove a product from the HashMap
  public shared func removeProduct(id: Int) : async ?Product {
    return map.remove(id);
  };

  // Retrieve all products as a list
  public query func getAllProducts() : async [(Int, Product)] {
    return Iter.toArray(map.entries());
  };

  // Change greet function to accept all parameters
  public query func greet(id: Int, title: Text, price: Int, rating: Int, image: Text) : async Text {
    return "Ram Ram, " # title # "!";
  };
};