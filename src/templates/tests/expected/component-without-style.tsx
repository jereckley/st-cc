import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'my-app'
})
export class MyApp {
  @Prop() first: string;
  @Prop() last: string;

  render() {
    return (
      <div>
        Hello, my name is {this.first} {this.last}
      </div>
    );
  }
}
