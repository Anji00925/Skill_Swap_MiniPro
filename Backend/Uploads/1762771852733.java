import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt(), M = sc.nextInt();
        char[][] grid = new char[N][M];
        for (int i = 0; i < N; i++)
            for (int j = 0; j < M; j++)
                grid[i][j] = sc.next().charAt(0);

        List<Integer> horizontal = new ArrayList<>();
        List<Integer> vertical = new ArrayList<>();

        for (int i = 0; i < N; i++) {
            boolean full = true;
            for (int j = 0; j < M; j++)
                if (grid[i][j] == '.') full = false;
            if (full) horizontal.add(i);
        }

        for (int j = 0; j < M; j++) {
            boolean full = true;
            for (int i = 0; i < N; i++)
                if (grid[i][j] == '.') full = false;
            if (full) vertical.add(j);
        }

        boolean[][] isCross = new boolean[N][M];
        for (int c : vertical) {
            for (int i = 0; i < N; i++) {
                int left = c - 1, right = c + 1;
                if (left >= 0 && right < M && grid[i][left] == 'C' && grid[i][right] == 'C')
                    isCross[i][c] = true;
            }
        }
        for (int r : horizontal) {
            for (int j = 0; j < M; j++) {
                int up = r - 1, down = r + 1;
                if (up >= 0 && down < N && grid[up][j] == 'C' && grid[down][j] == 'C')
                    isCross[r][j] = true;
            }
        }

        boolean[][] cable = new boolean[N][M];
        for (int i = 0; i < N; i++)
            for (int j = 0; j < M; j++)
                if (grid[i][j] == 'C' || isCross[i][j])
                    cable[i][j] = true;

        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < N * M; i++) adj.add(new ArrayList<>());
        int[] di = {-1, 0, 1, 0}, dj = {0, 1, 0, -1};

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (!cable[i][j]) continue;
                int id = i * M + j;
                for (int d = 0; d < 4; d++) {
                    int ni = i + di[d], nj = j + dj[d];
                    if (ni >= 0 && ni < N && nj >= 0 && nj < M && cable[ni][nj])
                        adj.get(id).add(ni * M + nj);
                }
            }
        }

        int start = -1;
        for (int i = 0; i < N && start == -1; i++) {
            for (int j = 0; j < M; j++) {
                if (cable[i][j] && adj.get(i * M + j).size() == 1) {
                    start = i * M + j;
                    break;
                }
            }
        }

        boolean[] visited = new boolean[N * M];
        int[] sumH = new int[N], sumV = new int[M];
        int curr = start, prev = -1;
        visited[curr] = true;

        while (true) {
            int cr = curr / M, cc = curr % M;
            int next = -1;
            for (int nb : adj.get(curr))
                if (nb != prev && !visited[nb]) {
                    next = nb;
                    break;
                }

            if (isCross[cr][cc] && prev != -1) {
                int pr = prev / M, pc = prev % M;
                int sign = (grid[cr][cc] == 'C') ? 1 : -1;

                if (pr == cr)
                    sumV[cc] += ((pc < cc) ? 1 : -1) * sign;
                else
                    sumH[cr] += ((pr < cr) ? 1 : -1) * sign;
            }

            if (next == -1) break;
            prev = curr;
            curr = next;
            visited[curr] = true;
        }

        long ans = 0;
        for (int r : horizontal) ans += Math.abs(sumH[r]) / 2;
        for (int c : vertical) ans += Math.abs(sumV[c]) / 2;

        System.out.println(ans);
    }
}
