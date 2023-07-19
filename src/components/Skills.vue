<template>
  <div class="hello">
    <div class="holder">

      <form @submit="addSkill">
        <input type="text" placeholder="Enter a skill you have..." v-model="skill">

        <transition name="alert-in" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
          <p class="alert" v-if="v$.skill.$error">{{ v$.skill.$errors[0].$message }}</p>
        </transition>
      </form>

      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <li v-for="skill in skills" :key="skill.id">
            {{ skill.skill }}
            <i class="fa fa-minus-circle" @click="deleteSkill(skill.id)"></i>
          </li>
        </transition-group>
      </ul>

      <p>These are the skills you currently have.</p>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

export default {
  name: 'SkillsSection',
  data() {
    return {
      v$: useVuelidate(),
      skill: '',
      skills: [],
    }
  },
  validations() {
    return {
      skill: { required, minLength: minLength(3) },
    }
  },
  methods: {
    async deleteSkill(id) {
      if(confirm('Are you sure?'))
      {
        const res = await fetch(`api/skills/${id}`, {
          method: 'delete',
        })

        res.status === 200 ? (this.skills = this.skills.filter((skill) => skill.id !== id)) : alert('Error deleting skill')
      }
    },
    async addSkill(e) {
      e.preventDefault();
      
      this.v$.$validate()
      if(!this.v$.$error)
      {
        const newSkill = {
        // id: Math.floor(Math.random() * 10000),
          skill: this.skill
        }

        const res = await fetch('api/skills', {
          method: 'post',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(newSkill)
        })

        const data = await res.json()

        this.skills = [...this.skills, data]
        // this.skills.push(data)

        // this.$emit('add-skill', newSkill)
        // this.skills.push(newSkill)

        // Clear the form 
        this.skill = ''
      }
    },
    async fetchSkills() {
      const res = await fetch('api/skills')

      const data = await res.json()

      return data
    },
  },
  async created() {
    this.skills = await this.fetchSkills()
  },
}

</script>

// <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"; 

  .holder {
    background: #fff;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  ul li {
    padding: 20px;
    font-size: 1.3em;
    background-color: #E0EDF4;
    border-left: 5px solid #3EB3F6;
    margin-bottom: 2px;
    color: #3E5252;
  }

  p {
    text-align:center;
    padding: 30px 0;
    color: gray;
  }

  .container {
    box-shadow: 0px 0px 40px lightgray;
  }

  input {
    width: calc(100% - 40px);
    border: 0;
    padding: 20px;
    font-size: 1.3em;
    background-color: #323333;
    color: #687F7F;
  }
  .alert {
    background: #fdf2ce;
    font-weight: bold;
    display: inline-block;
    padding: 5px;
    margin-top: -20px;
  }

  .alert-in-enter-active {
    animation: bounce-in .5s;
  }
  .alert-in-leave-active {
    animation: bounce-in .5s reverse;
  }

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

i {
  float:right;
  cursor:pointer;
}
</style>