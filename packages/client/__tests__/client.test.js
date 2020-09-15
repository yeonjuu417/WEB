import React from "react";
import { expect } from "chai";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Mypage } from "../src/pages/Mypage";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(
  `<!doctype html><html><body><p>paragraph</p></body></html>`
);

global.window = dom.window;
global.document = dom.window.document;

Enzyme.configure({ adapter: new Adapter() });

describe("Advanced Web Hiring Assessments - Client", () => {
  const mockedUser = {
    email: "coding.kim@codestates.com",
    username: "김코딩",
    mobile: "010-1523-2342",
  };

  describe("Mypage test", () => {
    let container;
    beforeEach(() => {
      container = document.createElement("div");
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
      container = null;
    });

    it("it should render user information if login", () => {
      const wrapper = mount(<Mypage isLogin={true} userinfo={mockedUser} />, {
        attachTo: container,
      });

      expect(wrapper.find("h1").text()).to.eql("Mypage");
      expect(wrapper.find(".username").text()).to.eql("김코딩");
      expect(wrapper.find(".email").text()).to.eql("coding.kim@codestates.com");
      expect(wrapper.find(".mobile").text()).to.eql("010-1523-2342");
    });

    it("it should not render user information if not login", () => {
      const wrapper = mount(<Mypage isLogin={false} userinfo={mockedUser} />, {
        attachTo: container,
      });

      expect(wrapper.find("h1").text()).to.eql("NOT FOUND");
      expect(wrapper.contains(".username")).to.eql(false);
      expect(wrapper.contains(".email")).to.eql(false);
      expect(wrapper.contains(".mobile")).to.eql(false);
    });
  });
});
