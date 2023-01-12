<script lang="ts">
	import { Card } from '$lib/components/common';
</script>

<div class="h-full w-full space-y-4">
  <Card class="pt-8">
    <div slot="header">I am a Header</div>
    <div>I am a body of contents</div>
  </Card>

  <Card color="primary" fullwidth={false}>
    <div slot="header">I don't have full width</div>
    <div>I am a Body of Effulgent Beryl</div>
  </Card>

  <Card color="secondary">
    <div slot="header">I am yet another Header</div>
    <div>And I wanna be the very best</div>
  </Card>

  <Card color="success">
    <div slot="header">Like no one ever was</div>
    <div>
      <p> To catch them is my real test</p>
      <p>To train them is my cause</p>
    </div>
  </Card>

  <Card color="danger">
    <div slot="header">(Ooh ooh ooh!)</div>
    <div>
      I will travel across the land
      <br>
      Searching far and wide
      <br>
      Each pokémon to understand
      <br>
      The power that's inside
      <br>
      (The power inside)
    </div>
  </Card>

  <Card color="warning">
    <div slot="header">Pokémon!</div>
    <div>
      <p>It's you and me</p>
      <p>I know it's my destiny</p>
      <p>Pokémon!</p>
      <p>Oh, you're my best friend</p>
      <p>In a world we must defend</p>
      <p>Pokémon!</p>
    </div>
  </Card>

  <Card color="info">
    <div>
      <p>A heart so true</p>
      <p>Our courage will pull us through</p>
      <p>You teach me and I'll teach you</p>
      <p>Pokémon!</p>
      <p>Gotta catch 'em all</p>
    </div>
  </Card>

  <Card color="white">
    <div>
      Every challenge along the way
      With courage I will face
      I will battle every day
      To claim my rightful place

      Come with me, the time is right
      There's no better team, yeah
      Arm in arm we'll win the fight
      It's always been our dream
    </div>
  </Card>

  <Card color="transparent" class="pb-8">
    <div>
      POKEMON
    </div>
  </Card>

</div>
