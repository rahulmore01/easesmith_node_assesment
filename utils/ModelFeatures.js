class ModelFeatures {
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }
  //reusabe functions--

  filter() {
    const queryCopy = { ...this.queryObj };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryCopy[el]);

    this.query = this.query.find(queryCopy);
    return this;
  }

  search() {
    if (this.queryObj.search) {
      const searchFields = ["name", "category", "size", "email"];
      this.query = this.query.or(
        searchFields.map((field) => ({
          [field]: new RegExp(this.queryObj.search, "i"),
        }))
      );
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryObj.page, 10) || 1;
    const limit = parseInt(this.queryObj.limit, 10) || 4;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  sort() {
    if (this.queryObj.sort) {
      const sortBy = this.queryObj.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    }
    return this;
  }
}

module.exports = ModelFeatures;
