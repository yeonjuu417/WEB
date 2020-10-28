import React from "react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

import { expect } from "chai";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Signup from "../src/pages/Signup";
import Mypage from "../src/pages/Mypage";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!doctype html><html><body><p>paragraph</p></body></html>`);

global.window = dom.window;
global.document = dom.window.document;

Enzyme.configure({ adapter: new Adapter() });

describe("Advanced Web Hiring Assessments - Client", () => {
  const mockedUser = {
    email: "coding.kim@codestates.com",
    username: "김코딩",
    mobile: "010-1523-2342",
  };

  describe("Signup test", () => {
    it("it should sign up successfully", () => {
      const wrapper = mount(
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      );
      const target = wrapper.children().childAt(0).childAt(0);
      const uniqueEmail = new Date().toISOString() + "@test.com";
      target.setState({
        email: uniqueEmail,
        password: "1234",
        username: "test",
        mobile: "010-1234-5678",
      });
      target.find(".btn-signup").simulate("click");

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
            .post("http://localhost:4000/signin", { email: uniqueEmail, password: "1234" })
            .then((res) => {
              expect(res.status).to.eql(200);
              res.status === 200 ? resolve() : reject();
            });
        }, 500);
      });
    });
  });

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

    it("it should render user information if userinfo is provided", () => {
      const wrapper = mount(<Mypage userinfo={mockedUser} />, {
        attachTo: container,
      });

      expect(wrapper.find("h1").text()).to.eql("Mypage");
      expect(wrapper.find(".username").text()).to.eql("김코딩");
      expect(wrapper.find(".email").text()).to.eql("coding.kim@codestates.com");
      expect(wrapper.find(".mobile").text()).to.eql("010-1523-2342");
    });

    it("it should render logout button with handler from props", () => {
      const handler = () => { }
      const wrapper = mount(<Mypage userinfo={mockedUser} handleLogout={handler} />, {
        attachTo: container,
      });
      expect(wrapper.find('button.btn-logout').prop('onClick')).to.eql(handler);
    })
  });
});
