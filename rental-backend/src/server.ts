import { PrismaClient } from '@prisma/client';
import swagger from './swagger';
import app from './app';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('Connected to the database successfully!');
    await swagger;

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error: any) {
    console.error('Error starting server:', error);
    process.exit(1);
  } finally {
    
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
