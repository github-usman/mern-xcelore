class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // SEARCH functionality done keyword will come from query params
  search() {
    const keyword = this.queryStr.keyword;
  
    if (keyword) {
      this.query = this.query.find({
        $or: [
          { first_name: { $regex: new RegExp(keyword, 'i') } },
          { last_name: { $regex: new RegExp(keyword, 'i') } }
        ]
      });
    }
  
    return this;
  }

  // Pagination depend on resultPerPage FROM ENV FILE
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

export default ApiFeatures;
