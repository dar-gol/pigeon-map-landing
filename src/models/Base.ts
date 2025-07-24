/**
 * Base class for all entities.
 * This class provides common properties and methods for all derived classes.
 *
 * @property {number} id - Unique identifier for the instance.
 * @property {Date} createDate - Date when the instance was created.
 * @property {Date} updateDate - Date when the instance was last updated.
 */
export default class Base {
  id!: number;
  createDate!: Date;
  updateDate!: Date;

  /**
   * Creates a new instance of the class it's called on, fills it with the provided data, and returns it.
   *
   * @param {object} data - The data to fill the new instance with.
   * @returns {T} The new instance.
   * @template T The type of the instance to create.
   */
  static create<T extends Base>(this: new () => T, data: object): T {
    const instance = new this();
    instance.fillData(data);
    return instance;
  }

  /**
   * Fills the instance with the provided data.
   *
   * @param {object} data - The data to fill the instance with.
   * @returns {this} The instance.
   */
  fillData(data: object) {
    Object.assign(this, data);
    return this;
  }

  /**
   * Creates a new instance of the same type as the current instance, copies all properties from the current instance to the new one, and returns the new instance.
   *
   * @returns {this} The new instance.
   */
  clone(): this {
    const Constructor = this.constructor as new () => this;
    const clone = new Constructor();
    return Object.assign(clone, this);
  }

  /**
   * Checks if the instance is new (typically by checking if `id` is undefined).
   *
   * @returns {boolean} True if the instance is new, false otherwise.
   */
  isNew(): boolean {
    return this.id === undefined;
  }

  /**
   * Checks if the instance matches the provided identifier or instance.
   *
   * If a number is provided, it checks if it matches the instance's id.
   * If an instance of Base (or derived class) is provided, it checks if its id matches the instance's id.
   *
   * @param {Base | number} idOrBase - The identifier or instance to match against.
   * @returns {boolean} True if the instance matches the provided identifier or instance, false otherwise.
   */
  isMatched(id: number): boolean;
  isMatched(base: Base): boolean;
  isMatched(idOrBase: Base | number): boolean {
    if (typeof idOrBase === "number") return this.id === idOrBase;
    return this.id === idOrBase.id;
  }

  /**
   * Returns a JSON representation of the instance.
   *
   * @returns {object} A JSON string representing the instance.
   */
  toJSON(): object {
    return this;
  }
}
