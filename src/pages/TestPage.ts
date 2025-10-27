// Test page for developing and testing new features
import m from 'mithril';

// Test page component
export const TestPage: m.ClosureComponent<unknown> = () => {

  return {
    view: () => {
      return m(".page", [
        m("h1", "Test Harness"),
        m("p", "This page is for developing and testing new features before integrating them into the main puzzle application."),

        m(".container", [
          m(".test-area", [
            m("h2", "Test Area"),
          ]),
        ]),
      ]);
    },
  };
};

export default TestPage;
