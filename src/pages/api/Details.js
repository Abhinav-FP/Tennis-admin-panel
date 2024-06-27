import { Component } from "react";
import Api from "./Api";

class Details extends Component {
  async login(data) {
    return Api.post(`/api/extract/login`, data);
  }
  async DataConvert(data) {
    return Api.post(`/api/extract/pdf-to-json`, data);
  }
  async AddRanking(data) {
    return Api.post(`/api/extract/ranking-data-post`, data);
  }
  async logout(token) {
    return Api.post(`/api/extract/logout`, token);
  }
  async check() {
    return Api.get(``);
  }

  render() {
    return (
      <div>
        <></>
      </div>
    );
  }
}

export default Details;
