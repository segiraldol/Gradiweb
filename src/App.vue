<template>
  <div class="contenedor">
    <Modal v-show="isModalVisible" @close="closeModal()">
      <template v-slot:header> {{ producto.titulo }} añadido al carrito </template>
      <template class="text-white" v-slot:body>
        <img :src="producto.fimg" alt="" />
        <h4>{{ producto.Cantidad }}</h4>
        <h4>{{ producto.Color }}</h4>
        <h4>{{ producto.talla }}</h4>
        <h4>{{ producto.Total }}</h4>
      </template>
    </Modal>
    <h1 align="center">Página de producto</h1>
    <div class="modal oculto"></div>
    <div v-if="datos" class="data">
      <div class="breadcrumbs"></div>
      <div class="row justify-content-center">
        <div class="col-11 col-md-6">
          <div class="featuredImg">
            <img :src="selectedImg" alt="{{datos.title}}" />
          </div>
          <div class="carruselImg">
            <img
              v-for="img in datos.images"
              :key="img"
              :src="img"
              @click="selectedImg = img"
              alt="{{datos.title}}"
            />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="autor"></div>
          <h2>{{ datos.title }}</h2>
          <h3 class="precio">$ {{ datos.price }}</h3>
          <span>{{ datos.vendor }}</span>
          <hr />
          <div v-for="opcion in datos.options">
            <!--select :name="opcion.name" :id="opcion.name">
              <option v-for="valor in opcion.values" :value="valor">{{ valor }}</option>
            </select-->
            <div v-if="opcion.name == 'Color'" class="fila">
              <h3>{{ opcion.name }}</h3>
              <div v-for="color in opcion.values" class="selector">
                <input type="radio" :value="color" id="color" v-model="Color" />
                <label
                  @click="Color = color"
                  :for="color"
                  class="etiqueta px-3 py-2 text-center"
                >
                  {{ color }}
                </label>
              </div>
            </div>
            <div v-if="opcion.name == 'Size'" class="fila">
              <h3>{{ opcion.name }}</h3>
              <div v-for="talla in opcion.values" class="selector">
                <input type="radio" :value="talla" id="talla" v-model="Size" />
                <label
                  @click="
                    Size = talla;
                    this.addClass;
                  "
                  :for="talla"
                  class="etiqueta px-3 py-2 text-center"
                >
                  {{ talla }}
                </label>
              </div>
            </div>
          </div>
          <hr />
          <div class="row justify-content-center">
            <div
              class="col-auto card p-2 mx-2 etiqueta selector"
              @click="MasMenos(cantidad)"
            >
              <h5>-</h5>
            </div>
            <div class="col px-3">
              <h1 align="center" id="cantidad" :v-model="cantidad">
                {{ cantidad }}
              </h1>
            </div>
            <div class="col-auto card p-2 mx-2 etiqueta selector" @click="cantidad++">
              <h5>+</h5>
            </div>
          </div>
          <hr />
          <div class="row justify-content-center">
            <button
              @click="
                addTo(
                  datos.title,
                  datos.id,
                  datos.featured_image,
                  datos.price,
                  Color,
                  Size,
                  cantidad
                );
                showModal();
              "
              :v-model="producto"
            >
              Carrito
            </button>
          </div>
          <hr />
          <div class="descripcion">
            <p v-html="datos.description"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "./components/Modal.vue";

export default {
  components: {
    Modal,
  },
  name: "ShopifyResult",
  data: () => {
    return {
      isModalVisible: false,
      datos: null,
      selectedImg: "",
      Color: "",
      Size: "",
      cantidad: 1,
      producto: {},
    };
  },
  mounted() {
    const url = "https://graditest-store.myshopify.com/products/free-trainer-3-mmw.js";
    axios({
      method: "get",
      url,
      ResponseType: "json",
    })
      .then((result) => {
        console.log(result.data);
        this.datos = result.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  watch: {
    datos(newData, oldData) {
      if (newData && !oldData) {
        this.selectedImg = newData.images[0];
      }
    },
  },
  methods: {
    MasMenos(cantidad) {
      if (cantidad > 1) {
        this.cantidad--;
      }
    },
    addTo(titulo, id, fimg, price, color, size, cantidad, destino) {
      this.producto = {
        titulo: titulo,
        id: id,
        Featured_image: fimg,
        Price: price,
        color: color,
        size: size,
        Cantidad: cantidad,
        Total: cantidad * price,
        destino: destino,
      };
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style lang="sass">
header
  line-height: 1.5

.logo
  display: block
  margin: 0 auto 2rem

@media (min-width: 1024px)
  header
    display: flex
    place-items: center
    padding-right: calc(var(--section-gap) / 2)

  .logo
    margin: 0 2rem 0 0

  header
    .wrapper
      display: flex
      place-items: flex-start
      flex-wrap: wrap
</style>
