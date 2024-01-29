import { PrismaClient, Rating } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const recipe1 = await prisma.recipe.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      title: 'Bramborová polévka',
      summary: 'Tradiční česká bramborová polévka s houbami a klobásou.',
      ingredients: '500g brambor, 200g hub, 150g klobásy, cibule, česnek, sůl, pepř',
      instructions:
        'Oloupejte a nakrájejte brambory, orestujte cibuli a česnek, přidejte houby a klobásu, vařte do měkka.',
      rating: Rating.FOUR,
      image_url: 'https://unsplash.com/photos/brown-tabby-cat-7GX5aICb5i4',
      prep_time: 20,
      cook_time: 40,
    },
  })

  const recipe2 = await prisma.recipe.upsert({
    where: { id: '2' },
    update: {},
    create: {
      id: '2',
      title: 'Svíčková na smetaně',
      summary: 'Klasické české jídlo s hovězím masem, zeleninou a smetanovou omáčkou.',
      ingredients:
        '500g hovězího masa, 200ml smetany, mrkev, petržel, celer, cibule, houskový knedlík',
      instructions:
        'Uvařte maso se zeleninou, připravte omáčku ze smetany a podávejte s knedlíkem.',
      rating: Rating.FIVE,
      image_url:
        'https://unsplash.com/photos/orange-tabby-cat-in-black-and-white-jacket-yJozLVBxNA0',
      prep_time: 30,
      cook_time: 120,
    },
  })

  console.log('Created or updated recipes:', recipe1, recipe2)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
