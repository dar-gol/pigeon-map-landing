import { isProduction } from "@/services/BaseService";
import Cookies from "js-cookie";

interface IStorage {
  get(): string;
  set(value: string): void;
  remove(): void;
}

class Cookie implements IStorage {
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
    Cookies.remove(this.name, { domain: this._getDomain() });
    // For previous cookies
    Cookies.remove(this.name, { domain: "pigeon-map.digging.pl" });
  }
}

class LocalStorage implements IStorage {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  private get name() {
    return `pigeonmap_digging_${this._name}`;
  }

  get() {
    return localStorage.getItem(this.name) || "";
  }

  set(value: string) {
    localStorage.setItem(this.name, value);
  }

  remove() {
    localStorage.removeItem(this.name);
  }
}

export default class StorageHelper {
  static token = new Cookie("token");
  static flightId = new Cookie("flightId");
  static season = new Cookie("season");
  static pigeonSeasonPageTab = new Cookie("pigeonSeasonPageTab");
  static sideAdShown = new Cookie("sideAdShown");
  static googleLoginViews = new LocalStorage("googleLoginTooltipViews");

  static getHorizontalAdShown(name = "") {
    return new Cookie(`horizontalAdShown_${name}`);
  }

  static getVerticalAdShown(name = "") {
    return new Cookie(`verticalAdShown_${name}`);
  }
}
