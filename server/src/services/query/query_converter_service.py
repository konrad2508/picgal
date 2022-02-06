class QueryConverterService(object):
    def convert_query(self, query):
        converted_query = {
            'id': query.query_id,
            'name': query.name,
            'query': query.query
        }

        return converted_query
