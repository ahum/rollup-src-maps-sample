import React from "react";
export const FooComp = () => <div>hello there</div>;

export const foo = "foo";
export const ping = (name) => {
  console.log("got a ping");
  return `hi ${name} this is ${foo}`;
};
