class VirtualTag(object):
    class Subtag(object):
        def __init__(self, name, condition):
            self.name = name
            self.condition = condition

    def __init__(self, name):
        self.name = name
        self.subtags = []
    
    def add_subtag(self, subtag_name, subtag_condition):
        self.subtags.append(VirtualTag.Subtag(subtag_name, subtag_condition))

        return self
