import unittest
from Functions import summ
from MyClass import MyClass

class TestStringMethods(unittest.TestCase):

  def setUp(self):
    self.mc = MyClass()

  def test_upper(self):
    self.assertEqual('foo'.upper(), 'FOO')

  def test_isupper(self):
    self.assertTrue('FOO'.isupper())
    self.assertFalse('Foo'.isupper())

  def test_split(self):
    s = 'hello world'
    self.assertEqual(s.split(), ['hello', 'world'])
    # check that s.split fails when the separator is not a string
    with self.assertRaises(TypeError):
      s.split(2)
  
  def test_summ(self):
    s = 'are you stupid?'
    self.assertEqual(summ(1, 1), 2, s)
    self.assertEqual(summ(2, 3), 5, s)
    self.assertFalse(summ(1, 1) == 3, 'should be false')
    self.assertTrue(summ(1, 1) == 2, s)
  
  def test_mc(self):
    self.assertEqual(self.mc.classFunction(), 'lets do some tests', 'jalla')

if __name__ == '__main__':
    unittest.main()
