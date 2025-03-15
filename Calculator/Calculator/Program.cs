namespace Calculator
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("--------------------------------------");

            try
            {
                Console.Write("Введіть перший дріб у форматі 'чисельник/знаменник': ");
                var fraction1 = ParseFraction(Console.ReadLine());
                
                Console.Write("Введіть другий дріб у форматі 'чисельник/знаменник': ");
                var fraction2 = ParseFraction(Console.ReadLine());
                
                Console.WriteLine("Оберіть операцію:");
                Console.WriteLine("1 - Додавання");
                Console.WriteLine("2 - Віднімання");
                Console.WriteLine("3 - Множення");
                Console.WriteLine("4 - Ділення");
                Console.Write("Ваш вибір: ");
                
                var choice = Console.ReadLine();
                
                Fraction result = null;
                
                switch (choice)
                {
                    case "1":
                        result = Fraction.Add(fraction1, fraction2);
                        Console.WriteLine($"Результат додавання: {result}");
                        break;
                    case "2":
                        result = Fraction.Subtract(fraction1, fraction2);
                        Console.WriteLine($"Результат віднімання: {result}");
                        break;
                    case "3":
                        result = Fraction.Multiply(fraction1, fraction2);
                        Console.WriteLine($"Результат множення: {result}");
                        break;
                    case "4":
                        result = Fraction.Divide(fraction1, fraction2);
                        Console.WriteLine($"Результат ділення: {result}");
                        break;
                    default:
                        Console.WriteLine("Невірний вибір операції.");
                        break;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Помилка: {ex.Message}");
            }

            Console.WriteLine("Програма завершена. Натисніть Enter для виходу.");
            Console.ReadLine();
        }

        private static Fraction ParseFraction(string input)
        {
            if (string.IsNullOrWhiteSpace(input))
            {
                throw new ArgumentException("Вхідний рядок не може бути порожнім.");
            }

            var parts = input.Split('/');

            if (parts.Length != 2)
            {
                throw new FormatException("Невірний формат дробу. Введіть у форматі 'чисельник/знаменник'.");
            }

            if (!int.TryParse(parts[0], out int numerator) || !int.TryParse(parts[1], out int denominator))
            {
                throw new FormatException("Чисельник і знаменник повинні бути цілими числами.");
            }

            return new Fraction(numerator, denominator);
        }
    }
}