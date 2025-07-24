import { isProduction } from "@/services/BaseService";
import Cookies from "js-cookie";

class Cookie {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  private get name() {
    return `pigeonmap_digging_${this._name}`;
  }

  get() {
    return Cookies.get(this.name) || "";
  }

  set(value: string) {
    Cookies.set(this.name, value, { domain: this._getDomain() });
  }

  private _getDomain() {
    return isProduction() ? ".digging.pl" : "localhost";
  }

  remove() {
    Cookies.remove(this.name);
  }
}

export default class CookieHelper {
  static token = new Cookie("token");
  static flightId = new Cookie("flightId");
  static season = new Cookie("season");
  static pigeonSeasonPageTab = new Cookie("pigeonSeasonPageTab");
  static sideAdShown = new Cookie("sideAdShown");

  static getHorizontalAdShown(name = "") {
    return new Cookie(`horizontalAdShown_${name}`);
  }

  static getVerticalAdShown(name = "") {
    return new Cookie(`verticalAdShown_${name}`);
  }
}
