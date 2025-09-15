import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

interface FormFieldProps {
  label: string;
  type?: 'text' | 'select' | 'textarea' | 'date' | 'file' | 'radio';
  placeholder?: string;
  options?: { value: string; label: string }[];
  radioOptions?: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  multiline?: boolean;
  onPress?: () => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  placeholder,
  options,
  radioOptions,
  value,
  onChange,
  required,
  multiline = false,
  onPress,
}) => {
  const renderField = () => {
    switch (type) {
      case 'select':
        return (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.picker}
            >
              <Picker.Item label={placeholder || "Select..."} value="" />
              {options?.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
        );
      
      case 'textarea':
        return (
          <TextInput
            style={[styles.input, styles.textArea]}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            multiline={true}
            numberOfLines={3}
          />
        );
      
      case 'date':
        return (
          <TouchableOpacity style={styles.dateInput} onPress={onPress}>
            <Text style={[styles.dateText, !value && styles.placeholder]}>
              {value || placeholder || 'Select Date'}
            </Text>
            <Ionicons name="calendar" size={20} color="#913472" />
          </TouchableOpacity>
        );
      
      case 'file':
        return (
          <TouchableOpacity style={styles.fileInput} onPress={onPress}>
            <Text style={[styles.fileText, !value && styles.placeholder]}>
              {value || 'Choose File'}
            </Text>
            <Ionicons name="cloud-upload" size={20} color="#913472" />
          </TouchableOpacity>
        );
      
      case 'radio':
        return (
          <View style={styles.radioContainer}>
            {radioOptions?.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.radioOption}
                onPress={() => onChange?.(option.value)}
              >
                <View style={[
                  styles.radioCircle,
                  value === option.value && styles.radioSelected
                ]}>
                  {value === option.value && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      
      default:
        return (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            multiline={multiline}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      {renderField()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  required: {
    color: '#ff0000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'white',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  fileInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'white',
  },
  fileText: {
    fontSize: 16,
    color: '#333',
  },
  placeholder: {
    color: '#999',
  },
  radioContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#913472',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    backgroundColor: '#913472',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  radioLabel: {
    fontSize: 14,
    color: '#913472',
  },
});