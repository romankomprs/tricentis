import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return this.props.errorComponent;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

/* // In order to use ErrorBoundary we can use it in components like this: 
function ComponentNameErrorBoundary(){
    <ErrorBoundary errorComponent={<h2>There was an erro...</h2>}>
        <MyComponnetName />
    </ErrorBoundary>
} */
