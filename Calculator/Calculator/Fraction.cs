namespace Calculator
{
    public class Fraction
    {
        public int Numerator { get; private set; }
        public int Denominator { get; private set; }

        public Fraction(int numerator, int denominator)
        {
            if (denominator == 0)
            {
                throw new ArgumentException("Знаменник не може бути нулем.");
            }

            Numerator = numerator;
            Denominator = denominator;

            Simplify();
        }

        public static Fraction Add(Fraction a, Fraction b)
        {
            var numerator = a.Numerator * b.Denominator + b.Numerator * a.Denominator;
            var denominator = a.Denominator * b.Denominator;
            
            return new Fraction(numerator, denominator);
        }

        public static Fraction Subtract(Fraction a, Fraction b)
        {
            var numerator = a.Numerator * b.Denominator - b.Numerator * a.Denominator;
            var denominator = a.Denominator * b.Denominator;
            
            return new Fraction(numerator, denominator);
        }

        public static Fraction Multiply(Fraction a, Fraction b)
        {
            var numerator = a.Numerator * b.Numerator;
            var denominator = a.Denominator * b.Denominator;
            
            return new Fraction(numerator, denominator);
        }
        
        public static Fraction Divide(Fraction a, Fraction b)
        {
            if (b.Numerator == 0)
            {
                throw new DivideByZeroException("Не можна ділити на дріб з чисельником 0.");
            }

            var numerator = a.Numerator * b.Denominator;
            var denominator = a.Denominator * b.Numerator;
            
            return new Fraction(numerator, denominator);
        }

        private void Simplify()
        {
            var gcd = GCD(Math.Abs(Numerator), Math.Abs(Denominator));
            
            Numerator /= gcd;
            Denominator /= gcd;

            if (Denominator < 0)
            {
                Numerator = -Numerator;
                Denominator = -Denominator;
            }
        }

        private int GCD(int a, int b)
        {
            while (b != 0)
            {
                var temp = b;
                b = a % b;
                a = temp;
            }
            
            return a;
        }

        public override string ToString()
        {
            return $"{Numerator}/{Denominator}";
        }
    }
}