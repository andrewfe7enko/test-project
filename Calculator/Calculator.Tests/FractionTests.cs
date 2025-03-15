namespace Calculator.Tests
{
    public class FractionTests
    {
        [Fact]
        public void Add_TwoFractions_ReturnsCorrectResult()
        {
            var fraction1 = new Fraction(1, 2);
            var fraction2 = new Fraction(1, 3);

            var result = Fraction.Add(fraction1, fraction2);

            Assert.Equal("5/6", result.ToString());
        }

        [Fact]
        public void Subtract_TwoFractions_ReturnsCorrectResult()
        {
            var fraction1 = new Fraction(1, 2);
            var fraction2 = new Fraction(1, 3);

            var result = Fraction.Subtract(fraction1, fraction2);

            Assert.Equal("1/6", result.ToString());
        }

        [Fact]
        public void Multiply_TwoFractions_ReturnsCorrectResult()
        {
            var fraction1 = new Fraction(1, 2);
            var fraction2 = new Fraction(1, 3);

            var result = Fraction.Multiply(fraction1, fraction2);

            Assert.Equal("1/6", result.ToString());
        }

        [Fact]
        public void Divide_TwoFractions_ReturnsCorrectResult()
        {
            var fraction1 = new Fraction(1, 2);
            var fraction2 = new Fraction(1, 3);

            var result = Fraction.Divide(fraction1, fraction2);

            Assert.Equal("3/2", result.ToString());
        }

        [Fact]
        public void Simplify_Fraction_ReturnsSimplifiedResult()
        {
            var fraction = new Fraction(8, 12);

            Assert.Equal("2/3", fraction.ToString());
        }

        [Fact]
        public void Divide_ByZero_ThrowsException()
        {
            var fraction1 = new Fraction(1, 2);
            var fraction2 = new Fraction(0, 3);

            Assert.Throws<DivideByZeroException>(() => Fraction.Divide(fraction1, fraction2));
        }
    }
}