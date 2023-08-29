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

/* // Then when we want to use ErrorBoundary we can wrap it in the required component like this: 
function ComponentNameErrorBoundary(){
    <ErrorBoundary errorComponent={<h2>There was an erro...</h2>}>
        <MyComponnetName />
    </ErrorBoundary>
} */
