class QueryService(object):
    def __init__(self, repository, converter):
        self.repository = repository
        self.converter = converter

    def get_queries(self):
        queries = self.repository.get_queries()
        queries = [ self.converter.convert_query(query) for query in queries ]

        return queries

    def create_query(self, query):
        created_query = self.repository.create_query(query)
        created_query = self.converter.convert_query(created_query)

        return created_query

    def modify_query(self, id, modifications):
        updated_query = self.repository.update_query(id, modifications)
        updated_query = self.converter.convert_query(updated_query)

        return updated_query

    def delete_query(self, id):
        self.repository.delete_query(id)
