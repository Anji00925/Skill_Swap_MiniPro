import java.util.*;

public class Mainn {
    static class Edge {
        int u, v;
        Edge(int a, int b) { u = Math.min(a, b); v = Math.max(a, b); }
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof Edge)) return false;
            Edge e = (Edge) o;
            return u == e.u && v == e.v;
        }
        public int hashCode() { return Objects.hash(u, v); }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int E = sc.nextInt();
        Map<Edge, Integer> map = new HashMap<>();

        for (int i = 0; i < E; i++) {
            int a = sc.nextInt(), b = sc.nextInt();
            map.put(new Edge(a, b), 1);
        }

        int diff = 0;
        for (int i = 0; i < E; i++) {
            int a = sc.nextInt(), b = sc.nextInt();
            Edge e = new Edge(a, b);
            if (map.containsKey(e)) map.remove(e);
            else diff++;
        }

        System.out.println(Math.max(1, diff / 2));
    }
}
