
## Project Initialization
1. Create a folder with your IT number.

   ```bash
   cd IT21302754
   git init
   git clone https://github.com/IT21302754/IT21302754.git
   cd IT21302754
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/IT21302754/IT21302754.git
   git push -u origin main
   ```

2. Initialize npm and install Playwright:
   ```bash
   npm init -y
   npm install -D @playwright/test
   npm init playwright@latest
   ```

3. Create a file in the Test folder.

4. Write the code to test.

5. Run the test:
   ```bash
   npx playwright test --headed
   ```

## Test Results
- Test results will be displayed in the console after execution.
- **Note:** Results may vary due to slow server issues. If you experience inconsistent results, it may be related to server performance. Please retry the tests if needed.
