import React, { useState, useEffect } from 'react';
import DatePicker from 'react-native-date-picker';

import { 
  Modal,
  Text, 
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Alert
} from 'react-native';

const Formulario = ({ 
  modalVisible,
  cerrarModal,
  // setModalVisible,
  pacientes,
  setPacientes,
  paciente: pacienteObj,
  setPaciente: setPacienteApp
}) => {

  const [id, setId] = useState('');
  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [sintomas, setSintomas] = useState('');

  useEffect( () => {

    if (Object.keys(pacienteObj).length > 0) {
      //console.log('Sí hay algo.')
      setId(pacienteObj.id);
      setPaciente(pacienteObj.paciente);
      setPropietario(pacienteObj.propietario);
      setEmail(pacienteObj.email);
      setTelefono(pacienteObj.telefono);
      setFecha(pacienteObj.fecha);
      setSintomas(pacienteObj.sintomas);
    }

    //console.log('Formulario Listo');
    

  }, [pacienteObj]);

  console.log('OBJETO', pacienteObj);

  

  const handleCita = () => {
      console.log('Presionaste agregar paciente');

      //validar
      if([paciente, propietario, email, fecha, sintomas].includes('')) {
        console.log('Hay errores');
        Alert.alert(
          'Error',
          'Todos los campos son obligatorios'
          );
        return;
      }

      //Revisar si es un registro nuevo o edición
      const nuevoPaciente = {
        //id: Date.now(),
        paciente,
        propietario,
        email,
        telefono,
        fecha,
        sintomas
      };

      console.log('ID', id);

      if(id) {
        //Editando
        nuevoPaciente.id = id;
        console.log("NUEVO_PACIENTE_EDICION", nuevoPaciente);
        const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState);
       
        setPacientes(pacientesActualizados);
        setPacienteApp({});
        
        // console.log(pacientesActualizados);
        // return;


      } else {
        //Nuevo Registro
        nuevoPaciente.id = Date.now();
        console.log(nuevoPaciente);
        setPacientes([...pacientes, nuevoPaciente]);
      }

      //setModalVisible(!modalVisible);
      cerrarModal();
      
      setId('');
      setPaciente('');
      setPropietario('');
      setEmail('');
      setTelefono('');
      setFecha(new Date());
      setSintomas('');

  };

  return (

    <Modal
      animationType='slide'
      visible={modalVisible}
    >
      <SafeAreaView style={styles.contenido}>

        <ScrollView>

          <Text style={styles.titulo}>{pacienteObj.id ? 'Editar' : 'Nueva'} {''}
            <Text style={styles.tituloBold}>Cita</Text>
          </Text>

          <Pressable 
            style={styles.btnCancelar}
            onLongPress={() => {
              //setModalVisible(!modalVisible);
              cerrarModal();
              setPacienteApp({});

              setId('');
              setPaciente('');
              setPropietario('');
              setEmail('');
              setTelefono('');
              setFecha(new Date());
              setSintomas('');

            }}
          >
            <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
          </Pressable>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder='Nombre Paciente'
              placeholderTextColor={'#666'}
              value={paciente}
              onChangeText={setPaciente}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder='Nombre Propietario'
              placeholderTextColor={'#666'}
              value={propietario}
              onChangeText={setPropietario}
            />
          </View>
          
          <View style={styles.campo}>
            <Text style={styles.label}>Email Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder='Email Propietario'
              placeholderTextColor={'#666'}
              keyboardType='email-address'
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Teléfono Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder='Teléfono Propietario'
              placeholderTextColor={'#666'}
              keyboardType='number-pad'
              value={telefono}
              onChangeText={setTelefono}
              maxLength={10}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Fecha Alta</Text>
            <View style={styles.fechaContenedor}>
              <DatePicker
                date={fecha}
                locale='es'
                textColor='#000'
                onDateChange={(date) => setFecha(date)}
              />
            </View>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Síntomas</Text>
            <TextInput
              style={[styles.input, styles.sintomasInput]}
              placeholder='Síntomas paciente'
              placeholderTextColor={'#666'}
              value={sintomas}
              onChangeText={setSintomas}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <Pressable 
            style={styles.btnNuevaCita}
            onPress={handleCita}
          >
            <Text style={styles.btnNuevaCitaTexto}>{pacienteObj.id ? 'Editar' : 'Agregar'} Paciente</Text>
          </Pressable>
          
        </ScrollView>

      </SafeAreaView>

    </Modal>
  );
};

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#6D28D9',
    flex: 1
  },
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFF'
  },
  tituloBold: {
    fontWeight: '900'
  },
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: '#5827A4',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10
  },
  btnCancelarTexto: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase'
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30
  },
  label: {
    color: '#FFF',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600'
  }, 
  input: {
    color: '#000',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
  },
  sintomasInput: {
    height: 100
  },
  fechaContenedor: {
    backgroundColor: '#FFF',
    borderRadius: 10
  },
  btnNuevaCita: {
    backgroundColor: '#F59E0B',
    marginVertical: 50,
    marginHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10
  },
  btnNuevaCitaTexto: {
    color: '#5827A4',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  }
});

export default Formulario;