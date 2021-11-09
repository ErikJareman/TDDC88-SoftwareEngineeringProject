""" Showcase of how to test python code """

import unittest
from functions import summ
from my_class import MyClass

class TestStringMethods(unittest.TestCase):
    """ Class for testing """

    def setUp(self):
        """ Set up """
        self.my_class = MyClass()

    def test_upper(self):
        """ Test .upper() """
        self.assertEqual('foo'.upper(), 'FOO')

    def test_isupper(self):
        """ Test .isupper() """
        self.assertTrue('FOO'.isupper())
        self.assertFalse('Foo'.isupper())

    def test_split(self):
        """ Test .split() """
        split_message = 'hello world'
        self.assertEqual(split_message.split(), ['hello', 'world'])
        # check that s.split fails when the separator is not a string
        with self.assertRaises(TypeError):
            split_message.split(2)

    def test_summ(self):
        """ Test summ() """
        error_message = 'are you stupid?'
        self.assertEqual(summ(1, 1), 2, error_message)
        self.assertEqual(summ(2, 3), 5, error_message)
        self.assertFalse(summ(1, 1) == 3, 'should be false')
        self.assertTrue(summ(1, 1) == 2, error_message)

    def test_mc(self):
        """ Test class_function() """
        self.assertEqual(self.my_class.class_function(), 'lets do some tests', 'jalla')

    if __name__ == '__main__':
        unittest.main()
