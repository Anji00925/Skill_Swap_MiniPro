import java.util.*;

public class DistinctFactors {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        Set<Integer> factors = new HashSet<>();

        for (int i = a; i <= b; i++) {
            for (int j = 1; j * j <= i; j++) {
                if (i % j == 0) {
                    factors.add(j);
                    factors.add(i / j);
                }
            }
        }

        System.out.println(factors.size());
    }
}
