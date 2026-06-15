<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <div class="container mx-auto flex flex-col gap-8 p-8">
    <h1 class="text-2xl font-semibold">
      nuxt-lepsios playground
    </h1>

    <section class="flex flex-wrap gap-4">
      <Button>Default</Button>
      <Button variant="outline">
        Outline
      </Button>
      <Button variant="destructive">
        Destructive
      </Button>
    </section>

    <section class="max-w-sm">
      <Input placeholder="Input placeholder" />
    </section>

    <section class="max-w-sm">
      <Card class="p-4">
        <p>Card with lepsios tokens</p>
      </Card>
    </section>

    <section>
      <Button @click="open = true">
        Open dialog
      </Button>
      <Dialog v-model:open="open">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog</DialogTitle>
            <DialogDescription>
              Layer component works
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>

    <Sonner />
  </div>
</template>
