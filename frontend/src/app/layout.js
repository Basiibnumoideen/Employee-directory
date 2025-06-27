// src/app/layout.js
// app/layout.js or src/app/layout.js
import './globals.css';
import ApolloWrapper from './components/ApolloWrapper';

export const metadata = {
  title: 'Employee Directory',
  description: 'A simple employee directory with GraphQL and Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
