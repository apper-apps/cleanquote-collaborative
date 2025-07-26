import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'
import pricingService from '@/services/api/pricingService'

const RateSettings = () => {
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [previewQuote, setPreviewQuote] = useState(null)

  useEffect(() => {
    loadRateConfig()
  }, [])

  const loadRateConfig = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await pricingService.getRateConfig()
      setConfig(data)
      generatePreview(data)
    } catch (err) {
      setError('Failed to load rate configuration')
      console.error('Error loading rate config:', err)
    } finally {
      setLoading(false)
    }
  }

  const generatePreview = async (currentConfig = config) => {
    if (!currentConfig) return
    
    try {
      // Create temporary service instance with current config
      const tempService = { ...pricingService }
      tempService.getRateConfig = async () => currentConfig
      
      const quote = await pricingService.calculateQuote('2 Bedroom', 'Bi-weekly', { pets: true })
      setPreviewQuote(quote)
    } catch (err) {
      console.error('Error generating preview:', err)
    }
  }

  const handleConfigUpdate = (section, field, value) => {
    const newConfig = { ...config }
    
    if (section === 'root') {
      newConfig[field] = value
    } else if (section === 'timeEstimates' || section === 'frequencyDiscounts') {
      newConfig[section][field] = value
    } else if (section === 'extraCharges') {
      if (typeof value === 'object') {
        newConfig[section][field] = { ...newConfig[section][field], ...value }
      } else {
        newConfig[section][field] = value
      }
    } else if (section === 'travelFee' || section === 'recurringDiscount') {
      newConfig[section][field] = value
    }
    
    setConfig(newConfig)
    generatePreview(newConfig)
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      await pricingService.updateRateConfig(config)
      toast.success('Rate settings saved successfully!')
    } catch (err) {
      toast.error('Failed to save rate settings')
      console.error('Error saving config:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleReset = async () => {
    if (!window.confirm('Reset to default settings? This will overwrite all your custom rates.')) {
      return
    }
    
    try {
      setSaving(true)
      const defaultConfig = await pricingService.resetToDefaults()
      setConfig(defaultConfig)
      generatePreview(defaultConfig)
      toast.success('Settings reset to defaults')
    } catch (err) {
      toast.error('Failed to reset settings')
      console.error('Error resetting config:', err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadRateConfig} />
  if (!config) return <Error message="No configuration data available" />

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">Rate Settings</h1>
          <p className="text-gray-600 mt-2">Configure your pricing structure and service rates</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={saving}
            className="flex items-center gap-2"
          >
            <ApperIcon name="RotateCcw" size={16} />
            Reset to Defaults
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2"
          >
            {saving ? (
              <ApperIcon name="Loader2" size={16} className="animate-spin" />
            ) : (
              <ApperIcon name="Save" size={16} />
            )}
            Save Changes
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Rates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ApperIcon name="Clock" size={20} className="text-primary" />
                Hourly Rate & Time Estimates
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Standard Hourly Rate ($)
                  </label>
                  <input
                    type="number"
                    value={config.hourlyRate}
                    onChange={(e) => handleConfigUpdate('root', 'hourlyRate', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    min="0"
                    step="0.50"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(config.timeEstimates).map(([homeSize, hours]) => (
                    <div key={homeSize}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {homeSize} (hours)
                      </label>
                      <input
                        type="number"
                        value={hours}
                        onChange={(e) => handleConfigUpdate('timeEstimates', homeSize, parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        min="0"
                        step="0.25"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Extra Charges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ApperIcon name="Plus" size={20} className="text-primary" />
                Extra Charges
              </h3>
              
              <div className="space-y-4">
                {Object.entries(config.extraCharges).map(([key, charge]) => (
                  <div key={key} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={charge.enabled}
                          onChange={(e) => handleConfigUpdate('extraCharges', key, { enabled: e.target.checked })}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary/20"
                        />
                        <span className="font-medium text-gray-800 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </div>
                    </div>
                    
                    {charge.enabled && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Amount ($)
                          </label>
                          <input
                            type="number"
                            value={charge.amount}
                            onChange={(e) => handleConfigUpdate('extraCharges', key, { amount: parseFloat(e.target.value) || 0 })}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            min="0"
                            step="0.50"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Description
                          </label>
                          <input
                            type="text"
                            value={charge.description}
                            onChange={(e) => handleConfigUpdate('extraCharges', key, { description: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            placeholder="Service description"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Frequency Discounts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ApperIcon name="Percent" size={20} className="text-primary" />
                Frequency Discounts
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(config.frequencyDiscounts).map(([frequency, discount]) => (
                  <div key={frequency}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {frequency} (%)
                    </label>
                    <input
                      type="number"
                      value={discount}
                      onChange={(e) => handleConfigUpdate('frequencyDiscounts', frequency, parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      min="0"
                      max="50"
                      step="0.5"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Additional Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ApperIcon name="Settings" size={20} className="text-primary" />
                Additional Settings
              </h3>
              
              <div className="space-y-6">
                {/* Minimum Charge */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Service Charge ($)
                  </label>
                  <input
                    type="number"
                    value={config.minimumCharge}
                    onChange={(e) => handleConfigUpdate('root', 'minimumCharge', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    min="0"
                    step="5"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum amount charged regardless of calculated price
                  </p>
                </div>

                {/* Travel Fee */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="checkbox"
                      checked={config.travelFee.enabled}
                      onChange={(e) => handleConfigUpdate('travelFee', 'enabled', e.target.checked)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary/20"
                    />
                    <span className="font-medium text-gray-800">Travel Fee</span>
                  </div>
                  
                  {config.travelFee.enabled && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Fee Amount ($)
                        </label>
                        <input
                          type="number"
                          value={config.travelFee.amount}
                          onChange={(e) => handleConfigUpdate('travelFee', 'amount', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          min="0"
                          step="1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Max Distance (miles)
                        </label>
                        <input
                          type="number"
                          value={config.travelFee.maxDistance}
                          onChange={(e) => handleConfigUpdate('travelFee', 'maxDistance', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          min="0"
                          step="1"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Recurring Discount */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="checkbox"
                      checked={config.recurringDiscount.enabled}
                      onChange={(e) => handleConfigUpdate('recurringDiscount', 'enabled', e.target.checked)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary/20"
                    />
                    <span className="font-medium text-gray-800">Recurring Client Discount</span>
                  </div>
                  
                  {config.recurringDiscount.enabled && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Discount (%)
                        </label>
                        <input
                          type="number"
                          value={config.recurringDiscount.amount}
                          onChange={(e) => handleConfigUpdate('recurringDiscount', 'amount', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          min="0"
                          max="25"
                          step="0.5"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Description
                        </label>
                        <input
                          type="text"
                          value={config.recurringDiscount.description}
                          onChange={(e) => handleConfigUpdate('recurringDiscount', 'description', e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          placeholder="Discount description"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Preview Quote */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="sticky top-6"
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ApperIcon name="Calculator" size={20} className="text-primary" />
                Preview Quote
              </h3>
              
              {previewQuote ? (
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <strong>Sample:</strong> 2 Bedroom, Bi-weekly, with pets
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Base Price:</span>
                      <span>${previewQuote.basePrice}</span>
                    </div>
                    
                    {previewQuote.extraCharges > 0 && (
                      <div className="flex justify-between">
                        <span>Extra Charges:</span>
                        <span>${previewQuote.extraCharges}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${previewQuote.subtotal}</span>
                    </div>
                    
                    {previewQuote.discount > 0 && (
                      <div className="flex justify-between text-accent">
                        <span>Frequency Discount ({previewQuote.discount}%):</span>
                        <span>-${(previewQuote.subtotal * previewQuote.discount / 100).toFixed(2)}</span>
                      </div>
                    )}
                    
                    {previewQuote.travelFee > 0 && (
                      <div className="flex justify-between">
                        <span>Travel Fee:</span>
                        <span>${previewQuote.travelFee}</span>
                      </div>
                    )}
                    
                    {previewQuote.minimumApplied && (
                      <div className="flex justify-between text-warning">
                        <span>Minimum Applied:</span>
                        <span>${config.minimumCharge}</span>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total:</span>
                        <span className="text-primary">${previewQuote.totalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <ApperIcon name="Calculator" size={48} className="mx-auto mb-2 opacity-50" />
                  <p>Preview will update as you modify settings</p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default RateSettings