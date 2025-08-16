import { Model } from 'sequelize';

class BaseModel extends Model {
  /**
   *
   * @param {number} limit
   * @param {number} page
   * @returns {{offset: number, limit: number}}
   */
  static setPagination(limit = 10, page = 1) {
    return {
      offset: (page - 1) * limit,
      limit,
    };
  }

  /**
   * @param {string
   *   | import('sequelize').ScopeOptions
   *   | readonly (string | import('sequelize').ScopeOptions)[]
   *   | import('sequelize').WhereAttributeHashValue<import('sequelize').Model>
   * } scopes
   * @returns {import('sequelize').Model}
   */
  static setScopes(scopes) {
    return scopes ? this.scope(scopes) : this.find;
  }

  /**
   * @param {Omit<import('sequelize').FindAndCountOptions, 'limit' | 'offset'> & {
   *   page: number,
   *   limit: number,
   *   scopes?: string
   *     | import('sequelize').ScopeOptions
   *     | readonly (string | import('sequelize').ScopeOptions)[]
   *     | import('sequelize').WhereAttributeHashValue<import('sequelize').Model>;
   * }} options
   * @returns {{count: number, rows: import('sequelize').Model[], totalPages: number}}
   */
  static async findAndCountAllByPage(options) {
    const { page, limit, scopes, ...rest } = options;

    const pagination = this.setPagination(limit, page);

    if (scopes) {
      const { count, rows } = await this.scope(scopes).findAndCountAll({
        ...pagination,
        ...rest,
      });

      const totalPages = Math.ceil(count / limit);

      return { count, rows, totalPages };
    }

    const { count, rows } = await this.findAndCountAll({
      ...pagination,
      ...rest,
    });

    const totalPages = Math.ceil(count / limit);

    return { count, rows, totalPages };
  }

  /**
   * @param {string | number} id
   * @param {Omit<import('sequelize').FindOptions, 'where' > & {
   *   scopes?: string
   *     | import('sequelize').ScopeOptions
   *     | readonly (string | import('sequelize').ScopeOptions)[]
   *     | import('sequelize').WhereAttributeHashValue<import('sequelize').Model>;
   * }} options
   * @returns {Promise<import('sequelize').Model | null>}
   */
  static findByPk(id, options = {}) {
    const { scopes, ...rest } = options;

    return this.scope(scopes).findByPk(id, rest);
  }
}

export default BaseModel;
