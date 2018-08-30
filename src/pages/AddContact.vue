<template>
  <div class="container mt-4">
    <form v-validate="validationConfig">
      <div class="form-group row">
        <label for="first_name" class="col-4 col-form-label">First Name</label>
        <div class="col-8">
          <div class="input-group">
            <input
              id="first_name"
              name="first_name"
              type="text"
              class="form-control here"
              v-model="contact.first_name"
              v-focus-on>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label for="last_name" class="col-4 col-form-label">Last Name</label>
        <div class="col-8">
          <div class="input-group">
            <input id="last_name"
                   name="last_name"
                   type="text"
                   class="form-control here"
                   v-model="contact.last_name">
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label for="email" class="col-4 col-form-label">Email</label>
        <div class="col-8">
          <input
            id="email"
            name="email"
            type="text"
            class="form-control here"
            v-model="contact.email">
        </div>
      </div>
      <div class="form-group row">
        <label for="number" class="col-4 col-form-label">Number</label>
        <div class="col-8">
          <div class="input-group">
            <input id="number"
                   name="number"
                   type="tel"
                   class="form-control here"
                   v-model="contact.number">
          </div>
        </div>
      </div>
      <div class="form-group row">
        <div class="offset-4 col-8">
          <button name="submit" type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { contacts } from '../services/Contacts'

export default {
  data () {
    return {
      contact: {
        first_name: '',
        last_name: '',
        email: '',
        number: ''
      },
      validationConfig: {
        validationRules: {
          email: [ 'required', 'email' ]
        },
        submitCallback: () => {
          this.onSubmit()
        }
      }
    }
  },

  created () {
    if (this.$route.params.id) {
      contacts.get(this.$route.params.id)
        .then((response) => {
          this.contact = response.data
        })
    }
  },

  methods: {
    onSubmit () {
      this.$route.params.id ? this.editContact() : this.addContact()
    },

    editContact () {
      contacts.edit(this.contact)
        .then(() => {
          this.$router.push('/contacts')
        })
    },

    addContact () {
      contacts.add(this.contact)
        .then(() => {
          this.$router.push('/contacts')
        })
    }
  }
}
</script>
