# Terrier Rails Assessment

![](app/assets/images/technician_rails_assessment_app_image.png)

The application was designed with a focus on simplicity and clarity, adhering to the Ruby on Rails MVC (Model-View-Controller) pattern to ensure separation of concerns. Models were created to map the provided data schema, and rake tasks were implemented to handle idempotent CSV imports. The scheduling grid leverages a dynamic frontend design to visually represent technicians and their work orders, enabling user interactivity through client-side alerts for schedule availability.

## Setting Up the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/TishG/terrier_rails_assessment.git
   ```

2. cd into project

   ```bash
   cd terrier_rails_assessment
   ```

3. Install Dependencies:

   ```bash
   bundle install
   ```

4. Set up the database:

   ```bash
   rails db:drop RAILS_ENV=development
   ```

   ```bash
   rails db:create RAILS_ENV=development
   ```

   ```bash
   rails db:migrate RAILS_ENV=development
   ```

5. Import CSV data:

   ```bash
   rake csv:import
   ```

6. Start the Rails server:

   ```bash
   rails server
   ```

7. Access the application at http://localhost:3000/schedules.
