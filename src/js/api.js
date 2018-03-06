
function Api() {};
var apiObj = new Api();
Api.prototype.index = function() {
  alert(1);
};
apiObj.cart = function() {
  return function() {
    alert(2);
  };
};
export {apiObj};
