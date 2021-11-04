""" Module containing MyClass """

class MyClass():
    """ Class called MyClass """
    message = 'lets do some tests'

    def class_function(self):
        """ Returns the class message """
        return self.message

    def another_function(self, number):
        """ Returns 0 """
        print(self.message)
        return number + 4
